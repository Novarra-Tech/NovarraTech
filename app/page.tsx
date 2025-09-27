import {title} from "@/components/primitives";
import {Navbar} from "@/components/Navbar";
import {Suspense} from "react";
import {Loading} from "@/components/Loading";

export default function Home() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <Suspense fallback={<Loading/>}>
            <div className="inline-block text-center justify-center">
                <h1 className={title()}>Home</h1>
            </div>
            </Suspense>
        </section>
    );
}
