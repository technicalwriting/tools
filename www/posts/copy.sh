for dir in */; do
    if [ -d "$dir" ]; then
        cp ./template.html ./$dir/index.html
    fi
done
