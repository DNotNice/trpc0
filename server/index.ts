import { publicProcedure, router } from './trpc';
import {z} from 'zod';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
const todoInputType = z.object({
    title :z.string(),
    description:z.string()
})

const appRouter = router({

    signUp : publicProcedure
    .input(z.object({
        email:z.string(),
        password : z.string()
    }))
    .mutation(async(ops)=>{
        let email = ops.input.email;
        let password  = ops.input.password
        //DB STUFF , VALIDATIONS HERE
        
        let token = "323422"
        return{
            token 
        } 
    }),

    createTodo :publicProcedure
    .input(z.object({
        title:z.string()
    }))
    .mutation(async (ops)=>{
        console.log(ops.ctx.username)
        return {id:1}
    })
});

 
  const server = createHTTPServer({
    router: appRouter,
    createContext(opts){
        let authHeader = opts.req.headers["authorization"]
        console.log(authHeader);
        //jwt.verify
        return {username:"123"}
    }
  });
   
  server.listen(3000);
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;