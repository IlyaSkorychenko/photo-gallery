#!/usr/bin/env bash

set -euo pipefail

echo "configuring localstack"
AWS_REGION=us-east-1

create_queue() {
  echo "sqs create queue"
  local QUEUE_NAME_TO_CREATE=$1

  awslocal sqs create-queue \
    --queue-name "${QUEUE_NAME_TO_CREATE}" \
    --region ${AWS_REGION} \
    --attributes VisibilityTimeout=180,ReceiveMessageWaitTimeSeconds=20,MessageRetentionPeriod=345600,DelaySeconds=0
}

create_bucket() {
  echo "S3 create bucket"
  local BUCKET_NAME_TO_CREATE=$1

  awslocal s3api create-bucket \
    --bucket "${BUCKET_NAME_TO_CREATE}" \
    --region ${AWS_REGION} \
    --endpoint-url http://localhost:4566
}

create_queue "image"

create_bucket "image"
