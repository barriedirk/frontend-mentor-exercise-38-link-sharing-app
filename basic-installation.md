I am using nx with pnpm

```bash
$ pnpm create nx-workspace@latest project --pm=pnpm

 NX   Let's create a new workspace [https://nx.dev/getting-started/intro]

✔ Which stack do you want to use? · none
✔ Would you like to use Prettier for code formatting? · Yes
✔ Which CI provider would you like to use? · skip
✔ Would you like remote caching to make your build faster? · skip

 NX   Creating your v21.5.3 workspace.

✔ Installing dependencies with pnpm
✔ Successfully created the workspace: project

 NX   Directory is already under version control. Skipping initialization of git.

 $ cd project





# plugin

 $ pnpm nx add @nx/react

✔ Installing @nx/react@21.5.3...

 NX  Generating @nx/react:init

UPDATE package.json
UPDATE nx.json
 WARN  5 deprecated subdependencies found: @types/minimatch@6.0.0, glob@7.2.3, glob@8.1.0, inflight@1.0.6, stable@0.1.8
Packages: +10
++++++++++
Progress: resolved 952, reused 855, downloaded 0, added 10, done
 WARN  Issues with peer dependencies found
.
└─┬ @swc-node/register 1.9.2
  └─┬ @swc-node/core 1.14.1
    └── ✕ unmet peer @swc/core@">= 1.13.3": found 1.5.29

dependencies:
+ react 19.0.0 (19.1.1 is available)
+ react-dom 19.0.0 (19.1.1 is available)

╭ Warning ───────────────────────────────────────────────────────────────────────────────────╮
│                                                                                            │
│   Ignored build scripts: esbuild.                                                          │
│   Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.   │
│                                                                                            │
╰────────────────────────────────────────────────────────────────────────────────────────────╯

Done in 1.6s using pnpm v10.11.1
✔ Initializing @nx/react...

 NX   Package @nx/react added successfully.


$ pnpm nx g @nx/react:app frontend --directory=packages/frontend --style=tailwind

$ nx show project @project/frontend


❯ pnpm nx show projects

@project/frontend-e2e
@project/frontend


$ pnpm add @nx/express

$ pnpm nx g @nx/express:app backend --directory=packages/backend --frontend-project=@project/frontend
 

❯ pnpm nx show projects
@project/frontend-e2e
@project/backend-e2e
@project/frontend
@project/backend


$ pnpm nx serve frontend

$ pnpm nx serve frontend --configuration=production
$ pnpm nx build frontend

$ pnpm nx serve backend
$ pnpm nx build backend
$ pnpm nx test backend


pnpm add -D concurrently


$ pnpm run start:all

$ pnpm nx run-many --target=serve --projects=frontend,backend




$ pnpm add -w dotenv



$ docker-compose up -d

$ docker run --name link-db -e POSTGRES_USER=dev -e POSTGRES_PASSWORD=dev -e POSTGRES_DB=linkdb -p 5432:5432 -d postgres



 ```


 investigate

 mkdir link-sharing-backend
cd link-sharing-backend

npm init -y

# Install express, cors, dotenv for config, and Prisma related packages
npm install express cors dotenv

# Prisma CLI (dev dependency)
npm install -D prisma
npm install @prisma/client



npx prisma init

DATABASE_URL="postgresql://dev:dev@localhost:5432/linkdb?schema=public"


prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String   // hashed password
  links     Link[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Link {
  id        Int      @id @default(autoincrement())
  url       String
  title     String?
  description String?
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}


npx prisma migrate dev --name init


pnpm add @preact/signals-react --filter=frontend

pnpm add react-router-dom --filter=frontend
pnpm add -D @types/react-router-dom --filter=frontend


# update tailwind
pnpm add -D tailwindcss@latest postcss@latest autoprefixer@latest --filter=frontend


pnpm add -D @tailwindcss/vite --filter=frontend

pnpm add @tailwindcss/postcss --filter=frontend


NOTE: problem to update tailwind 4, try later
