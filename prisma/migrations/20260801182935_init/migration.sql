-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('active', 'completed', 'canceled');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('low', 'medium', 'high');

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "ProjectStatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" "TaskPriority" NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "deadline" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_users" (
    "id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "task_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_public_id_key" ON "projects"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_public_id_key" ON "users"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_public_id_key" ON "tasks"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "task_users_task_id_user_id_key" ON "task_users"("task_id", "user_id");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_users" ADD CONSTRAINT "task_users_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_users" ADD CONSTRAINT "task_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
