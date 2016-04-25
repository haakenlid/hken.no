#!/bin/bash
LISTNODES=\
'name1 labels="{..}"
name2 labels="{...}"'
echo "$LISTNODES" | awk  '{print $1}' 
awk  '{print $1}' '$LISTNODES'
