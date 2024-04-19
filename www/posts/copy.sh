for dir in */; do
    if [ -d "$dir" ]; then
        mv ./$dir/template.html ./$dir/index.html
    fi
done
