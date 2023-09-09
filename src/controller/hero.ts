import * as express from "express";
import { HeroService } from "../service/hero";

export class HeroController {
  constructor(private heroService: HeroService = new HeroService()) {}
  public getHeroes(req: express.Request, res: express.Response) {
    res.status(202).json(this.heroService.getHeroes());
  }
}
