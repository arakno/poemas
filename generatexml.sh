#!/bin/bash

declare -r XML_FILE="sample.xml"

$result_file='df.dat'

$open_tag='<TAG>'
$close_tag='</TAG>'
$insert_point='<XML>'


[ -f ${XML_FILE} ] && : > ${XML_FILE}

for directory_name in $(ls -F . | grep '/' | sed 's|/||')
do
   echo -e "<types>" >> ${XML_FILE}
   dirfiles=$(ls -A ${directory_name})
   if [ "${dirfiles}" ] ; then
      for files in ${dirfiles}
      do
         echo -e "\t<members>${files/.*}</members>" >> ${XML_FILE}
				 # echo "${open_tag}\n${line}\n${close_tag}"
      done
   fi
   echo -e "\t<name>${directory_name}</name>" >> ${XML_FILE}
   echo -e "</types>" >> ${XML_FILE}
done