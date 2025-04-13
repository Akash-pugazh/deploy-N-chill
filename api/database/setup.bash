#!/bin/bash

psql -d "deploy_db" -U "node_user" -a -f setup.sql