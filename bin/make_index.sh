#!/bin/bash

function rm_if_exists {
  if [[ -f $1 || -h $1 ]]; then
    rm $1
  fi
}

# Project dirs
STD=$(dirname $(readlink -f $0))/..
INDEX=$STD/index.js
LIB=$(ls $STD/lib)

# Get rid of index before recreating
rm_if_exists $INDEX

# Change default field separator
IFS='.'

# Create module import string
MODULES=$(echo $LIB | tr '.' '\t' | awk '{print $1": require(\"./lib/"$1"\"),"}' )

# Change field separator back
IFS=' '

echo "module.exports = {" >> $INDEX
echo "${MODULES%?}" >> $INDEX
echo "}" >> $INDEX
