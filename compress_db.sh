#!bin/sh
tar cvf db_data.tar db_data
bzip2 db_data.tar
chmod 755
