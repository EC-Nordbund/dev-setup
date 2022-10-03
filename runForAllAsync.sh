if [ "$(uname)" == "Darwin" ]; then
  echo "Mac wird nicht unterstützt!"
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
  # TODO: implementieren (@tobi)
  echo "Dies muss noch implementiert werden"
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
  ./runForAllSync.win.sh $1 $2 $3
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
  ./runForAllSync.win.sh $1 $2 $3
fi