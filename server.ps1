# Lightweight Localhost Static Web Server (PowerShell HttpListener)
param(
    [int]$Port = 8000
)

$Root = $PSScriptRoot
if (-not $Root) { $Root = (Get-Location).Path }

$Listener = New-Object System.Net.HttpListener
$Prefix = "http://localhost:$Port/"
$Listener.Prefixes.Add($Prefix)
$Listener.Prefixes.Add("http://127.0.0.1:$Port/")
$Listener.Start()

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " NovaFlow Static Web Server running at:" -ForegroundColor Green
Write-Host " -> http://localhost:$Port" -ForegroundColor Yellow
Write-Host " -> http://127.0.0.1:$Port" -ForegroundColor Yellow
Write-Host " Serving directory: $Root" -ForegroundColor Gray
Write-Host " Press Ctrl+C to stop." -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan

$MimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".md"   = "text/markdown; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".ico"  = "image/x-icon"
}

try {
    while ($Listener.IsListening) {
        $Context = $Listener.GetContext()
        $Request = $Context.Request
        $Response = $Context.Response

        $UrlPath = $Request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($UrlPath)) {
            $UrlPath = "index.html"
        }

        $FilePath = Join-Path $Root $UrlPath
        if ((Test-Path $FilePath) -and -not (Get-Item $FilePath).PSIsContainer) {
            $Ext = [System.IO.Path]::GetExtension($FilePath).ToLower()
            $ContentType = $MimeTypes[$Ext]
            if (-not $ContentType) { $ContentType = "application/octet-stream" }

            $Bytes = [System.IO.File]::ReadAllBytes($FilePath)
            $Response.ContentType = $ContentType
            $Response.ContentLength64 = $Bytes.Length
            $Response.StatusCode = 200
            $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
        } else {
            $NotFoundBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $UrlPath")
            $Response.ContentType = "text/plain; charset=utf-8"
            $Response.ContentLength64 = $NotFoundBytes.Length
            $Response.StatusCode = 404
            $Response.OutputStream.Write($NotFoundBytes, 0, $NotFoundBytes.Length)
        }
        $Response.OutputStream.Close()
    }
} finally {
    $Listener.Stop()
}
