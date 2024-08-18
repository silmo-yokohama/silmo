<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0">
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
