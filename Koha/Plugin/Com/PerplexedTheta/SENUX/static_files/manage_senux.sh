#!/usr/bin/env bash
SCRIPT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)"

if [[ "${EUID}" -eq 0 ]]; then
    echo 'Please run as a non-root (or sudo) user.' && exit 1
fi

export npm_config_prefix="${SCRIPT_DIR}"
export npm_config_cache="${SCRIPT_DIR}/node_cache"

alias npm="$(which npm)"
alias npx="$(which npx)"

cd "${SCRIPT_DIR}"

build_js() {
    npx gulp js || exit 1

    return
}

build_sass() {
    npx gulp sass || exit 1

    return
}

build_all() {
    build_js
    build_sass

    return
}

init() {
    cp -nv "${SCRIPT_DIR}/src/css/variables.sample.scss" "${SCRIPT_DIR}/variables.scss"
    cp -nv "${SCRIPT_DIR}/src/css/customisations.sample.scss" "${SCRIPT_DIR}/customisations.scss"
    cp -nv "${SCRIPT_DIR}/src/js/customisations.sample.js" "${SCRIPT_DIR}/customisations.js"
    build_all

    return
}

install() {
    mkdir -pv "${SCRIPT_DIR}/node_cache" || exit 1
    mkdir -pv "${SCRIPT_DIR}/node_modules" || exit 1
    npm install --include=dev || exit 1

    return
}

install_all() {
    install
    init

    return
}

reset() {
    cp -fv "${SCRIPT_DIR}/src/js/customisations.sample.js" "${SCRIPT_DIR}/customisations.js"
    build_all

    return
}

reset_all() {
    cp -fv "${SCRIPT_DIR}/src/css/variables.sample.scss" "${SCRIPT_DIR}/variables.scss"
    cp -fv "${SCRIPT_DIR}/src/css/customisations.sample.scss" "${SCRIPT_DIR}/customisations.scss"
    reset

    return
}

delete() {
    rm -fv "${SCRIPT_DIR}/package-lock.json"
    rm -rfv "${SCRIPT_DIR}/node_modules/"
    rm -rfv "${SCRIPT_DIR}/node_cache/"
    rm -fv "${SCRIPT_DIR}/dist/senux.min.js"
    rm -fv "${SCRIPT_DIR}/dist/senux.min.css"

    return
}

delete_all() {
    rm -fv "${SCRIPT_DIR}/variables.scss"
    rm -fv "${SCRIPT_DIR}/customisations.scss"
    rm -fv "${SCRIPT_DIR}/customisations.js"
    delete

    return
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

    exit 0
}

while true; do
    case "$1" in
        -bj|--build-js)
            build_js ; shift ;;
        -bs|--build-sass)
            build_sass ; shift ;;
        -ba|--build-all)
            build_all ; shift ;;
        -in|--init)
            init ; shift ;;
        -i|--install)
            install ; shift ;;
        -ia|--install-all)
            install_all ; shift ;;
        -r|--reset)
            reset ; shift ;;
        -ra|--reset-all)
            reset_all ; shift ;;
        -d|--delete)
            delete ; shift ;;
        -da|--delete-all)
            delete_all ; shift ;;
        -m|--man)
            usage ; shift ;;
        -h|--help)
            usage ; shift ;;
        --)
            shift ; break ;;
        *)
            echo 'Internal error processing command line arguments' ; exit 1 ;;
    esac

    exit 0
done
