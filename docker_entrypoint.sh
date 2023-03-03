#!/bin/sh

if test -f /etc/postgresql/14/jellyfin/postgresql.conf
then
  # restart
  echo "postgresql already initialized"
  echo "starting postgresql..."
  service postgresql start
else
  # fresh install
  echo 'setting up postgresql...'
  # set permissions for postgres folders
  chown -R postgres:postgres $POSTGRES_DATADIR
  chown -R postgres:postgres $POSTGRES_CONFIG
  chmod -R 700 $POSTGRES_DATADIR
  chmod -R 700 $POSTGRES_CONFIG
  mkdir -p /media/start9
  su - postgres -c "pg_createcluster 14 jellyfin"
  echo "starting postgresql..."
  service postgresql start
fi

exec ./jellyfin/jellyfin --datadir "$POSTGRES_DATADIR" --cachedir "$POSTGRES_CONFIG" --ffmpeg /usr/bin/ffmpeg
