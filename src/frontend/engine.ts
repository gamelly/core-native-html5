
import { create_backend } from "../backend";
import { is_paused, pause, resume } from "./pause";
import { create_frontend } from "../frontend";

type HyperVisorEngine = {
    frontbus: {
        on: (key: string, func: unknown) => {}
    },
    frontend: Awaited<ReturnType<typeof create_frontend>>,
    backend: Awaited<ReturnType<typeof create_backend>>,
    pause_reasons: Record<string, boolean>
}

export async function create_engine(hv: HyperVisorEngine, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    const methods = () => ({
        frontend: hv.frontend,
        backend: hv.backend,
        pause: (motive: string) => {
            pause(hv.pause_reasons, motive)
        },
        resume: (motive: string) => {
            resume(hv.pause_reasons, motive)
        },
        isPaused: () => {
            return is_paused(hv.pause_reasons)
        },
        getImageData: () => {
            return ctx.getImageData(0, 0, canvas.width, canvas.height)
        },
        stroke: (size: number) => {
            ctx.lineWidth = size
            return methods()
        },
        on: (key: string, func: unknown) => {
            hv.frontbus.on(key, func)
            return methods()
        }    
    })

    return methods()
}
