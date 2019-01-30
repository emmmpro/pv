const Redis = require("ioredis")

const Koa = require("koa")

const Router = require("koa-router")

const router = new Router()

const app = new Koa()

const redis = new Redis(process.env.REDIS_HOST)

router.get("/", async (ctx, next) => {
  await next()

  await redis.incr("pv")

  const current = await redis.get("pv")

  ctx.body = `current pv: ${current}`
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
