import { z } from "zod";
import { conditionTypes } from "./book-types";

export const createBookSchema = z.object({
  title: z.string().min(1, "Titolo richiesto"),
  isbn: z
    .string()
    .regex(/^(978|979)-\d{1,5}-\d{1,7}-\d{1,6}-\d$/, "ISBN-13 non corretto"),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Formato prezzo errato")
    .max(9, "Il prezzo non può avere più di 9 cifre"),
  condition: z
    .string()
    .refine(
      (value) => conditionTypes.includes(value),
      "Condizione inesistente"
    ),
  sector: z.string().min(1, {
    message: "Settore richiesto",
  }),
  course: z.string().min(1, {
    message: "Classe richiesta",
  }),
  subject: z.string().min(1, {
    message: "Materia richiesta",
  }),
  image: z
    .any()
    .refine(
      (file) => file && file.type.startsWith("image/"),
      "Immagine richiesta"
    )
    .refine(
      (file) => file && file.size < 1024 * 1024 * 2,
      "Immagine con peso non superiore a 2MB"
    ),
  ownerId: z.string().min(1, "Id proprietario richiesto"),
});

export const FilterBookSchema = z.object({
  q: z.string().optional(),
  sector: z.string().optional(),
  course: z.string().optional(),
  subject: z.string().optional(),
  condition: z.string().optional(),
});