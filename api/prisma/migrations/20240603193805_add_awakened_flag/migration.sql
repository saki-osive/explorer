-- CreateEnum
CREATE TYPE "PendingTransactionStatus" AS ENUM ('UNKNOWN', 'ON_CHAIN', 'EXPIRED');

-- CreateTable
CREATE TABLE "CommunityWallet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "awakened" BOOLEAN NOT NULL,
    "multisig" JSONB,

    CONSTRAINT "CommunityWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Validator" (
    "address" BYTEA NOT NULL,
    "validatorIp" TEXT,
    "fullNodeIp" TEXT,

    CONSTRAINT "Validator_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "Node" (
    "ip" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "lastCheck" TIMESTAMP(3),
    "isUp" BOOLEAN,
    "ledgerVersion" BIGINT,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("ip")
);

-- CreateTable
CREATE TABLE "PendingTransaction" (
    "hash" BYTEA NOT NULL,
    "sender" BYTEA NOT NULL,
    "sequenceNumber" BIGINT NOT NULL,
    "maxGasAmount" BIGINT NOT NULL,
    "gasUnitPrice" BIGINT NOT NULL,
    "expirationTimestampSecs" BIGINT NOT NULL,
    "chainId" INTEGER NOT NULL,
    "publicKey" BYTEA NOT NULL,
    "signature" BYTEA NOT NULL,
    "functionName" TEXT NOT NULL,
    "moduleAddress" BYTEA NOT NULL,
    "moduleName" TEXT NOT NULL,
    "args" BYTEA[],
    "typeArgs" TEXT[],
    "status" "PendingTransactionStatus" NOT NULL DEFAULT 'UNKNOWN',

    CONSTRAINT "PendingTransaction_pkey" PRIMARY KEY ("hash")
);
