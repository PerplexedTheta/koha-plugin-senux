#!/usr/bin/env bash
SCRIPT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)"


if [[ "${EUID}" -eq 0 ]]; then
    echo 'Please run as a non-root (or sudo) user.' && exit 1
fi

cd "${SCRIPT_DIR}"

export NPM_DIR="${SCRIPT_DIR}/.npm"
export NVM_DIR="${SCRIPT_DIR}/.nvm"

source_nvm() {
    if [[ -s "${NVM_DIR}/nvm.sh" ]]; then
        . "${NVM_DIR}/nvm.sh" || exit $?
    else
        echo "nvm command not found on PATH" && exit 1
    fi

    return 0
}

install_nvm_and_node() {
    mkdir -pv "${NVM_DIR}"

    alias curl="$(which curl)"
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/refs/heads/master/install.sh | bash -E

    source_nvm

    nvm install --lts || exit $?
    npm install -g npm || exit $?

    return 0
}

if [[ ! -s "${NVM_DIR}/nvm.sh" ]]; then
    install_nvm_and_node
fi

source_npm() {
    source_nvm

    if [[ ! -s "$(which npm)" ]] \
    || [[ ! -s "$(which npx)" ]]; then
        echo "npm or npx command not found on PATH" && exit 1
    fi

    alias npm="$(which npm)"
    alias npx="$(which npx)"

    export npm_config_cache="${NPM_DIR}"

    return 0
}

install_npm_modules() {
    mkdir -pv "${NPM_DIR}"

    source_npm

    npm install --include=dev || exit $?

    return 0
}

if [[ ! -d "${SCRIPT_DIR}/node_modules/gulp" ]] \
|| [[ ! -d "${SCRIPT_DIR}/node_modules/gulp-cli" ]] \
|| [[ ! -d "${SCRIPT_DIR}/node_modules/gulp-minify" ]] \
|| [[ ! -d "${SCRIPT_DIR}/node_modules/gulp-rename" ]] \
|| [[ ! -d "${SCRIPT_DIR}/node_modules/gulp-sass" ]] \
|| [[ ! -d "${SCRIPT_DIR}/node_modules/gulp-sourcemaps" ]] \
|| [[ ! -d "${SCRIPT_DIR}/node_modules/sass" ]]; then
    install_npm_modules
fi

init() {
    if [[ ! -f "${SCRIPT_DIR}/variables.scss" ]]; then
        cp -v "${SCRIPT_DIR}/src/css/variables.sample.scss" "${SCRIPT_DIR}/variables.scss"
    fi
    if [[ ! -f "${SCRIPT_DIR}/customisations.scss" ]]; then
        cp -v "${SCRIPT_DIR}/src/css/customisations.sample.scss" "${SCRIPT_DIR}/customisations.scss"
    fi
    if [[ ! -f "${SCRIPT_DIR}/customisations.js" ]]; then
        cp -v "${SCRIPT_DIR}/src/js/customisations.sample.js" "${SCRIPT_DIR}/customisations.js"
    fi

    return 0
}
init

build_js() {
    source_npm

    npx gulp js || exit $?

    return 0
}

build_sass() {
    source_npm

    npx gulp sass || exit $?

    return 0
}

build_all() {
    build_js
    build_sass

    return 0
}

install() {
    build_all

    return 0
}

install_reinstall() {
    delete
    install_nvm_and_node
    install_npm_modules
    build_all

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
    rm -rfv "${NPM_DIR}/"
    rm -rfv "${NVM_DIR}/"
    rm -rfv "${SCRIPT_DIR}/node_modules/"
    rm -fv "${SCRIPT_DIR}/package-lock.json"
    rm -fv "${SCRIPT_DIR}/dist/senux."*

    return 0
}

delete_all() {
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

    -i|--install        An alias for --build-all. As this script checks the nvm
                        and npm and runs an install if required, on each call,
                        an install flag is essentially pointless.

    -ir|--reinstall     Runs this script with --delete, and then with --install.
                        Useful if npm has broken, but you're not certain it is
                        due to any customisations you've made (i.e. if someone
                        has upgraded nodejs without your knowledge).

    -r|--reset          Resets just the JavaScript template file to its default
                        contents. Use with caution.

    -ra|--reset-all     Resets both the SASS and the JavaScript. This will wipe
                        out any customisations you've made. Use with extreme
                        caution.

    -d|--delete         Deletes the nvm and npm files, and the package-lock.json.
                        Useful if your installation has stopped working due to
                        problems with nodejs.

    -da|--delete-all    A HIGHLY DESTRUCTIVE ACTION. This will delete all of the
                        template files created and updated by the user, as well
                        as run the --delete action, which cleans up nvm and npm.
                        ONLY do this if you're starting your styling from
                        scratch, or if you wish to remove the plugin permanently.

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
        -i|--install)
            install ; exit 0 ;;
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
            echo 'Everything is ready for use' ; exit 0 ;;
    esac

    exit 0
done

exit 0
