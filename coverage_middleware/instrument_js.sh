ORIGIN_DIR="js"
INSTRUMENTED_DIR="../js"

echo "Instrumenting js files from ${ORIGIN_DIR} to ${INSTRUMENTED_DIR}"
./node_modules/nyc instrument ${ORIGIN_DIR} ${INSTRUMENTED_DIR}