<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0">

        @routes
        @vite('resources/ts/app.tsx')
        @vite('resources/css/app.scss')
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
