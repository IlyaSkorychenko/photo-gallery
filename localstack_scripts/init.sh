#!/usr/bin/env bash

set -euo pipefail

echo "configuring localstack"
LOCALSTACK_HOST=localhost
AWS_REGION=us-east-1

create_queue() {
    echo "sqs create queue"
    local QUEUE_NAME_TO_CREATE=$1

    awslocal sqs create-queue \
    --queue-name ${QUEUE_NAME_TO_CREATE} \
    --region ${AWS_REGION} \
    --attributes VisibilityTimeout=180,ReceiveMessageWaitTimeSeconds=20,MessageRetentionPeriod=345600,DelaySeconds=0
}

#create_queue "QUEUE_NAME_TO_CREATE"