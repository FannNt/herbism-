CREATE TYPE "public"."experience_level" AS ENUM('beginner', 'intermediate', 'expert');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('male', 'female');--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('user', 'planter');--> statement-breakpoint
CREATE TABLE "plant" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "plant_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer,
	"name" varchar(250) NOT NULL,
	"kind" varchar(250) NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "profiles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer,
	"age" integer NOT NULL,
	"gender" "gender" NOT NULL,
	"region" varchar NOT NULL,
	"healthCondition" text NOT NULL,
	"healthGoals" text NOT NULL,
	"allergies" text NOT NULL,
	"experienceLevel" "experience_level" NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"username" varchar(250) NOT NULL,
	"name" varchar(250) NOT NULL,
	"email" varchar(250) NOT NULL,
	"role" "roles" DEFAULT 'user',
	"city" varchar(250) NOT NULL,
	"password" varchar(250) NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "plant" ADD CONSTRAINT "plant_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "users" USING btree ("email");