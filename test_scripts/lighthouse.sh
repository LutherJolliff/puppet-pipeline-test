npm run build;
npm run serve-static-files;
bash -c 'while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:4200)" != "200" ]]; do sleep 5; done';
npm run lighthouse;
npm run stop-static-files;