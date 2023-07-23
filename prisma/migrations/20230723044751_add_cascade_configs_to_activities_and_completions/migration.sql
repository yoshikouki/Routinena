-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "completions" DROP CONSTRAINT "completions_activity_id_fkey";

-- DropForeignKey
ALTER TABLE "completions" DROP CONSTRAINT "completions_user_id_fkey";

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completions" ADD CONSTRAINT "completions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completions" ADD CONSTRAINT "completions_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
