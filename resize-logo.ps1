# PowerShell script to resize logo
Add-Type -AssemblyName System.Drawing

$inputPath = "c:\Users\Granthik\Desktop\Project_3\n1\src\images\ahir_samaj_logo.webp"
$outputPath = "c:\Users\Granthik\Desktop\Project_3\n1\src\images\ahir_samaj_logo_optimized.png"

try {
    # Load the image
    $img = [System.Drawing.Image]::FromFile($inputPath)
    
    Write-Host "Original dimensions: $($img.Width)x$($img.Height)"
    
    # Create new bitmap with target size (3x display size for retina)
    $newWidth = 315
    $newHeight = 210
    $newImg = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
    
    # Draw resized image with high quality
    $graphics = [System.Drawing.Graphics]::FromImage($newImg)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    
    $graphics.DrawImage($img, 0, 0, $newWidth, $newHeight)
    
    # Save as PNG
    $newImg.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    # Get file sizes
    $originalSize = (Get-Item $inputPath).Length / 1KB
    $newSize = (Get-Item $outputPath).Length / 1KB
    
    Write-Host "`n✓ Logo resized successfully!"
    Write-Host "  New dimensions: ${newWidth}x${newHeight}"
    Write-Host "  Original size: $([math]::Round($originalSize, 2)) KB"
    Write-Host "  New size: $([math]::Round($newSize, 2)) KB"
    Write-Host "  Savings: $([math]::Round($originalSize - $newSize, 2)) KB"
    Write-Host "`nSaved to: $outputPath"
    
    # Cleanup
    $graphics.Dispose()
    $newImg.Dispose()
    $img.Dispose()
    
} catch {
    Write-Host "Error: $_"
    Write-Host "`nNote: PowerShell does not support WebP natively."
    Write-Host "Please use Squoosh.app instead (see logo-optimization-guide.md)"
}
