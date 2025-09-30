import {title} from "@/components/primitives";
import {Navbar} from "@/components/Navbar";
import {Suspense} from "react";
import {Loading} from "@/components/Loading";
import HomePageAnimation from "@/components/HomePageAnimation";

export default function Home() {
    return (
        <div>
            <HomePageAnimation/>
            {/*<div className="inline-block text-center justify-center">*/}
            {/*    /!*<h1 className={title()}>Home</h1>*!/*/}

            {/*</div>*/}
        </div>
    );
}
