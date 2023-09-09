import * as express from "express";

export class HeroController {
  constructor() {}
  public getHeroes(req: express.Request, res: express.Response) {
    res.status(202).json({ heroes: HEROES });
  }
}

export interface Hero {
  id: number;
  name: string;
}

export const HEROES: Hero[] = [
  { id: 12, name: "Dr. Nice" },
  { id: 13, name: "Bombasto" },
  { id: 14, name: "Celeritas" },
  { id: 15, name: "Magneta" },
  { id: 16, name: "RubberMan" },
  { id: 17, name: "Dynama" },
  { id: 18, name: "Dr. IQ" },
  { id: 19, name: "Magma" },
  { id: 20, name: "Tornado" },
];
