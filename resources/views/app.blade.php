<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0">

        <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('favicon.ico') }}">
        <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon.ico') }}">
        <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('favicon.ico') }}">
<!-- Google tag (gtag.js) -->
        @if(config('app.env') === 'production')
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-1KR91204N3"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-1KR91204N3');
          </script>
        @endif
        @routes
        @vite('resources/ts/app.tsx')
        @vite('resources/css/app.scss')
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
