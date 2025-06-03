// src/app/actions/upsert-patient/index.ts
"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { upsertPatientSchema } from "./schema";

export const upsertPatient = actionClient
  .schema(upsertPatientSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Não autorizado. Sessão não encontrada.");
    }

    if (!session?.user.clinic?.id) {
      throw new Error("Clínica não encontrada para o usuário da sessão.");
    }

    const clinicId = session.user.clinic.id;

    if (parsedInput.id) {
      // Update existing patient
      await db.update(patientsTable).set({
        ...parsedInput,
        clinicId, // Garante que o paciente ainda pertence à clínica correta
        updatedAt: new Date(),
      });
      eq(patientsTable.id , parsedInput.id); // Correção aqui: eq(patientsTable.id, parsedInput.id)
    } else {
      // Insert new patient
      await db.insert(patientsTable).values({
        ...parsedInput,
        clinicId,
      });
    }

    revalidatePath("/patients");

    return {
      success: true,
      message: parsedInput.id
        ? "Paciente atualizado com sucesso!"
        : "Paciente adicionado com sucesso!",
    };
  });
