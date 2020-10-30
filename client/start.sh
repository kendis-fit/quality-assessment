if [ -z "$(command -v serve)" ]; then
    echo "You don't have";
    exit 1;
fi

serve -p $PORT -s .