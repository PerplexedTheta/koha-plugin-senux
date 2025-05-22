#!/usr/bin/env bash
SCRIPT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)"

if [[ "${EUID}" -eq 0 ]]; then
    echo 'Please run as a non-root (or sudo) user.' && exit 1
fi

install_nvm_and_node() {
    mkdir -pv "${SCRIPT_DIR}/nvm_dir"
    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/refs/heads/master/install.sh | NVM_DIR="${SCRIPT_DIR}/nvm_dir" bash
    source_nvm
    nvm install --lts

    return 0
}

source_nvm() {
    if [[ -s "${SCRIPT_DIR}/nvm_dir/nvm.sh" ]]; then
        . "${SCRIPT_DIR}/nvm_dir/nvm.sh"
    else
        echo "could not find nvm" && exit 1
    fi

    return 0
}

if [[ ! -d "${SCRIPT_DIR}/nvm_dir" ]]; then
    install_nvm_and_node
    source_nvm
else
    source_nvm
fi

export npm_config_prefix="${SCRIPT_DIR}"
export npm_config_cache="${SCRIPT_DIR}/node_cache"

alias npm="$(which npm)"
alias npx="$(which npx)"

cd "${SCRIPT_DIR}"

build_js() {
    npx gulp js || exit $?

    return 0
}

build_sass() {
    npx gulp sass || exit $?

    return 0
}

build_all() {
    build_js
    build_sass

    return 0
}

init() {
    cp -nv "${SCRIPT_DIR}/src/css/variables.sample.scss" "${SCRIPT_DIR}/variables.scss"
    cp -nv "${SCRIPT_DIR}/src/css/customisations.sample.scss" "${SCRIPT_DIR}/customisations.scss"
    cp -nv "${SCRIPT_DIR}/src/js/customisations.sample.js" "${SCRIPT_DIR}/customisations.js"
    build_all

    return 0
}

install() {
    mkdir -pv "${SCRIPT_DIR}/node_cache" || exit $?
    mkdir -pv "${SCRIPT_DIR}/node_modules" || exit $?

    npm install --include=dev || exit $?

    return 0
}

install_all() {
    install
    init

    return 0
}

install_reinstall() {
    delete
    install

    return 0
}

reset() {
    cp -fv "${SCRIPT_DIR}/src/js/customisations.sample.js" "${SCRIPT_DIR}/customisations.js"
    build_all

    return 0
}

reset_all() {
    cp -fv "${SCRIPT_DIR}/src/css/variables.sample.scss" "${SCRIPT_DIR}/variables.scss"
    cp -fv "${SCRIPT_DIR}/src/css/customisations.sample.scss" "${SCRIPT_DIR}/customisations.scss"
    reset

    return 0
}

delete() {
    rm -fv "${SCRIPT_DIR}/package-lock.json"
    rm -rfv "${SCRIPT_DIR}/node_modules/"
    rm -rfv "${SCRIPT_DIR}/node_cache/"
    rm -fv "${SCRIPT_DIR}/dist/senux.min.js"
    rm -fv "${SCRIPT_DIR}/dist/senux.min.css"

    return 0
}

delete_all() {
    rm -rfv "${SCRIPT_DIR}/nvm_dir"
    rm -fv "${SCRIPT_DIR}/variables.scss"
    rm -fv "${SCRIPT_DIR}/customisations.scss"
    rm -fv "${SCRIPT_DIR}/customisations.js"
    delete

    return 0
}

usage() {
    local scriptname=$0
    cat <<EOF

Manages the current SENUX instance.

Usage: $scriptname [option]

Options:

    -bj|--build-js      Dispatches gulp to rebuild the JavaScript, which
                        essentially involves minifying the contents of
                        customisations.js, and placing it in the correct folder.

    -bs|--build-sass    Dispatches gulp to rebuild the SASS, which involves
                        compiling all the various SENUX SASS into a single,
                        minified CSS file.

    -ba|--build-all     Runs build-js, then runs build-sass. That's all.

    -in|--init          Populates the plugin with necessary template SASS and
                        JavaScript file(s). Essential for any builds to pass.
                        Note that running this script with --init will not reset
                        any pre-existing templates. To do that, see --reset and
                        --reset-all.

    -i|--install        Runs npm install, but doesn't populate the plugin with
                        any templates. Best used for upgrades.

    -ia|--install-all   Runs npm install, then calls this script with --init, to
                        populate the plugin with the necessary template SASS and
                        JavaScript file(s). Best used for fresh installs.

    -ir|--reinstall     Runs this script with --delete, and the with --install.
                        Useful if npm has broken, but you're not certain it is
                        due to any customisations you've made (i.e. if someone
                        has upgraded nodejs without your knowledge).

    -r|--reset          Resets just the JavaScript template file to its default
                        contents. Use with caution.

    -ra|--reset-all     Resets both the SASS and the JavaScript. This will wipe
                        out any customisations you've made. Use with extreme
                        caution.

    -d|--delete         Deletes the npm files and the package-lock.json. Useful
                        if your installation has stopped working due to problems
                        with nodejs.

    -da|--delete-all    A HIGHLY DESTRUCTIVE ACTION. This will delete all of the
                        template files created and updated by the user, as well
                        as run the --delete action, which cleans up npm. ONLY do
                        this if you're starting your styling from scratch, or if
                        you wish to remove the plugin permanently.

    -h|--help           Shows this message

    -m|--man            Also shows this message

EOF

    return 0
}

while true; do
    case "$1" in
        -bj|--build-js)
            build_js ; exit 0 ;;
        -bs|--build-sass)
            build_sass ; exit 0 ;;
        -ba|--build-all)
            build_all ; exit 0 ;;
        -in|--init)
            init ; exit 0 ;;
        -i|--install)
            install ; exit 0 ;;
        -ia|--install-all)
            install_all ; exit 0 ;;
        -ir|--reinstall)
            install_reinstall ; exit 0 ;;
        -r|--reset)
            reset ; exit 0 ;;
        -ra|--reset-all)
            reset_all ; exit 0 ;;
        -d|--delete)
            delete ; exit 0 ;;
        -da|--delete-all)
            delete_all ; exit 0 ;;
        -m|--man)
            usage ; exit 0 ;;
        -h|--help)
            usage ; exit 0 ;;
        --)
            shift ; break ;;
        *)
            echo 'Internal error processing command line arguments' ; exit 1 ;;
    esac

    exit 0
done

exit 0
