#!/bin/sh 

dir=`dirname $0`
template="$dir/runtime-env.js.tmpl"
#outFile="runtime-env.js"
outFile="/usr/share/nginx/html/runtime-env.js"
echo "Generating runtime-env.js";

# Read environment variable list
appEnvVars=`cat $dir/env-vars.txt`
echo $appEnvVars 

varLines=""
for envVar in $appEnvVars ; do 
  val="$(eval echo \$$envVar)" 
  varLines="$varLines\"$envVar\":\"$val\","
done
varLines=$(echo "  $varLines" | sed -e 's/,$//g')

echo $varLines

IFS=$'\n'
outLines=""
templateLines=`cat $template`
for line in $templateLines ; do 
  outLines="${outLines}${line}"
  if [[ $line =~ BEGIN.ENVIRONMENT.DEFINITION ]]; then
    outLines="${outLines}${varLines}"
  fi 
done

echo $outLines

echo ""
echo "Writing: $outFile"
printf $outLines > $outFile
