
export default function Home() {
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Home</h1>
                        <p className="text-balance text-muted-foreground">
                            Welcome to your account
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}