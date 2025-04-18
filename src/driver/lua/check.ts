const mock = async (_: {}) => {}

async function check_wasmoon(hv: {vm: {lua: unknown}}) {
    if (!hv.vm.lua) {
        throw new Error('wasmoon is required!')
    }
}

async function check_fengari(hv: {vm: {fengari: unknown}}) {
    if (!hv.vm.fengari) {
        throw new Error('fengari is required!')
    }
}

export default {
    wasmoon: {
        prepare: mock,
        install: check_wasmoon,
        startup: mock
    },
    fengari: {
        prepare: mock,
        install: check_fengari,
        startup: mock
    },
    fengari_wasmoon: {
        install: async (hv) => {
            let errors = 0;

            await Promise.allSettled([check_wasmoon(hv), check_fengari(hv)]).then(results => {
                errors = results.filter(result => result.status === "rejected").length
            })

            if (errors >= 2) {
                throw new Error('wamoon or fengari is required!')
            }
        },
        prepare: mock,
        startup: mock
    }    
}
