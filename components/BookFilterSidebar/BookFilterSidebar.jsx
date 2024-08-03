"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { filterBooks } from "./actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { conditionTypes } from "@/lib/book-types";
import dataIspiana from "@/lib/dataIspiana";
import { Button } from "../ui/button";
import FormSubmitButton from "./FormSubmitButton";

const BookFilterSidebar = ({ defaultValues }) => {
  let bookSelectedCourse = defaultValues.course ?? "";
  let bookSelectedSector = defaultValues.sector ?? "";
  let bookSelectedSubject = defaultValues.subject ?? "";

  const [sectorSelected, setSectorSelected] = useState(bookSelectedSector);
  const [classSelected, setClassSelected] = useState(bookSelectedCourse);
  const [subjectSelected, setSubjectSelected] = useState(bookSelectedSubject);
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

  return (
    <aside className="md:w-[260px] sticky top-0 h-fit bg-background border rounded-lg p-4">
      <form action={filterBooks}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Cerca</Label>
            <Input
              id="q"
              name="q"
              placeholder="ISBN, Titolo"
              defaultValue={defaultValues.q}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="sector">Settore</Label>
            <Select
              value={sectorSelected}
              onValueChange={(value) => {
                setSectorSelected(value);
                setClassSelected("");
                setSubjectSelected("");
              }}
              name="sector"
            >
              <SelectTrigger id="sector">
                <SelectValue placeholder="Seleziona un settore" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>Seleziona un settore</SelectItem>
                {Object.keys(dataIspiana).map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="course">Classe</Label>
            <Select
              value={classSelected}
              onValueChange={(value) => {
                setClassSelected(value);
                setSubjectSelected("");
              }}
              name="course"
            >
              <SelectTrigger id="course">
                <SelectValue placeholder="Seleziona una classe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>Seleziona una classe</SelectItem>
                {classOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="subject">Materia</Label>
            <Select
              value={subjectSelected}
              onValueChange={(value) => {
                setSubjectSelected(value);
              }}
              name="subject"
            >
              <SelectTrigger id="subject">
                <SelectValue placeholder="Seleziona una materia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>Seleziona una materia</SelectItem>
                {subjectOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="condition">Condizione</Label>
            <Select name="condition">
              <SelectTrigger id="condition">
                <SelectValue placeholder="Seleziona una condizione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>Seleziona una condizione</SelectItem>
                {conditionTypes.map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <FormSubmitButton className="w-full">Filtra libri</FormSubmitButton>
        </div>
      </form>
    </aside>
  );
};

export default BookFilterSidebar;
