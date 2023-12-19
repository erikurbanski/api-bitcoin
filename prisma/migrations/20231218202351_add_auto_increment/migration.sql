-- AlterTable
CREATE SEQUENCE accounts_id_seq;
ALTER TABLE "accounts" ALTER COLUMN "id" SET DEFAULT nextval('accounts_id_seq');
ALTER SEQUENCE accounts_id_seq OWNED BY "accounts"."id";

-- AlterTable
CREATE SEQUENCE deposits_id_seq;
ALTER TABLE "deposits" ALTER COLUMN "id" SET DEFAULT nextval('deposits_id_seq');
ALTER SEQUENCE deposits_id_seq OWNED BY "deposits"."id";

-- AlterTable
CREATE SEQUENCE movements_id_seq;
ALTER TABLE "movements" ALTER COLUMN "id" SET DEFAULT nextval('movements_id_seq');
ALTER SEQUENCE movements_id_seq OWNED BY "movements"."id";
