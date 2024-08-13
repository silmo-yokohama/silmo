<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0">

        <title>Laravel</title>

        @vite('resources/ts/app.tsx')
        @vite('resources/css/app.scss')
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
