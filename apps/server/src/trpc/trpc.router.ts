import { INestApplication, Injectable } from "@nestjs/common";
import { TrpcService } from "./trpc.service";
import { z } from "zod";
import * as trpcExpress from "@trpc/server/adapters/express";

@Injectable()
export class TrpcRouter {
    public appRouter;

    constructor(private readonly trpcService: TrpcService) {
        this.appRouter = this.trpcService.router({
            hello: this.trpcService.procedure
                .input(z.object({ name: z.string().optional() }))
                .query(({ input }) => {
                    return `Hello ${input?.name ?? 'World'}!`;
                }),
        });
    }


    async applyMiddleware(app: INestApplication) { // apply trpc middleware to express app
        app.use(
            '/trpc', // trpc router path
            trpcExpress.createExpressMiddleware({
                router: this.appRouter,
            })
        )
    }
}

export type AppRouter = TrpcRouter['appRouter'];