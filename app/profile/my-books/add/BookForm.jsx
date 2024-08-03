"use client";

import LoadingButton from "@/components/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { conditionTypes } from "@/lib/book-types";
import dataIspiana from "@/lib/dataIspiana";
import { createBookSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMask } from "@react-input/mask";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createBook } from "./actions";

const BookForm = ({ session }) => {
  const form = useForm({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      ownerId: session.user.id,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setValue,
    reset,
  } = form;

  const onSubmit = async (values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await createBook(formData);
      toast.success("Libro caricato correttamente");
    } catch (error) {
      toast.error("Errore durante l'aggiunta del libro");
    }
  };

  const [sectorSelected, setSectorSelected] = useState("");
  const [classSelected, setClassSelected] = useState("");
  const [subjectSelected, setSubjectSelected] = useState("");
  const [classOptions, setClassOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  useEffect(() => {
    if (sectorSelected) {
      setClassOptions(Object.keys(dataIspiana[sectorSelected] || {}));
      setSubjectOptions([]);
    } else {
      setClassOptions([]);
      setSubjectOptions([]);
    }
  }, [sectorSelected]);

  useEffect(() => {
    if (sectorSelected && classSelected) {
      setSubjectOptions(dataIspiana[sectorSelected]?.[classSelected] || []);
    } else {
      setSubjectOptions([]);
    }
  }, [sectorSelected, classSelected]);

  const ISBNRef = useMask({
    mask: "___-__-___-____-_",
    replacement: { _: /\d/ },
  });
  // const PriceRef = useMask({
  //   mask: "€ __,__",
  //   replacement: { _: /\d/, ".": /,/ },
  // });

  return (
    <main className="m-auto my-16 max-w-3xl space-y-10">
      <div className="space-y-6 rounded-lg border p-4">
        <div>
          <h2 className="font-semibold">Aggiungi libro</h2>
        </div>
        <Form {...form}>
          <form
            className="space-y-4"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titolo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex. Entriamo in azienda up 3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex. 978-88-233-6250-5"
                      {...field}
                      ref={ISBNRef}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prezzo</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.5"
                      placeholder="ex. 35,50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between gap-2">
              <FormField
                control={control}
                name="sector"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Settore</FormLabel>
                    <Select
                      value={sectorSelected}
                      onValueChange={(value) => {
                        setSectorSelected(value);
                        setClassSelected("");
                        setSubjectSelected("");
                        field.onChange(value);
                        setValue("course", "");
                        setValue("subject", "");
                      }}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona un settore" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={null}>
                          Seleziona un settore
                        </SelectItem>
                        {Object.keys(dataIspiana).map((sector) => (
                          <SelectItem key={sector} value={sector}>
                            {sector}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="course"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Classe</FormLabel>
                    <Select
                      value={classSelected}
                      onValueChange={(value) => {
                        setClassSelected(value);
                        setSubjectSelected("");
                        field.onChange(value);
                        setValue("subject", "");
                      }}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona una classe" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={null}>
                          Seleziona una classe
                        </SelectItem>
                        {classOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Materia</FormLabel>
                    <Select
                      value={subjectSelected}
                      onValueChange={(value) => {
                        setSubjectSelected(value);
                        field.onChange(value);
                      }}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona una materia" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={null}>
                          Seleziona una materia
                        </SelectItem>
                        {subjectOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condizione</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona una condizione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={null}>
                        Seleziona una condizione
                      </SelectItem>
                      {conditionTypes.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="image"
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormLabel>Immagine</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldValues}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValues.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <LoadingButton type="submit" loading={isSubmitting}>
                Aggiungi
              </LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default BookForm;
