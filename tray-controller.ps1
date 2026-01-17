# سكربت التحكم في السيرفر عبر System Tray
# يعرض أيقونة في منطقة الإشعارات للتحكم في السيرفر

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# إنشاء NotifyIcon
$notifyIcon = New-Object System.Windows.Forms.NotifyIcon
$notifyIcon.Icon = [System.Drawing.SystemIcons]::Application
$notifyIcon.Text = "الوساطة العقارية - السيرفر يعمل"
$notifyIcon.Visible = $true

# إنشاء قائمة السياق
$contextMenu = New-Object System.Windows.Forms.ContextMenuStrip

# عنصر فتح المتصفح
$openBrowserItem = New-Object System.Windows.Forms.ToolStripMenuItem
$openBrowserItem.Text = "فتح الموقع"
$openBrowserItem.Add_Click({
    Start-Process "http://localhost:8000"
})

# عنصر إيقاف السيرفر
$stopServerItem = New-Object System.Windows.Forms.ToolStripMenuItem
$stopServerItem.Text = "إيقاف السيرفر"
$stopServerItem.Add_Click({
    $result = [System.Windows.Forms.MessageBox]::Show(
        "هل تريد إيقاف السيرفر؟",
        "إيقاف السيرفر",
        [System.Windows.Forms.MessageBoxButtons]::YesNo,
        [System.Windows.Forms.MessageBoxIcon]::Question
    )

    if ($result -eq [System.Windows.Forms.DialogResult]::Yes) {
        # إنهاء عمليات Node.js
        Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force

        [System.Windows.Forms.MessageBox]::Show(
            "تم إيقاف السيرفر بنجاح!",
            "الوساطة العقارية",
            [System.Windows.Forms.MessageBoxButtons]::OK,
            [System.Windows.Forms.MessageBoxIcon]::Information
        )

        # إخفاء الأيقونة وإغلاق التطبيق
        $notifyIcon.Visible = $false
        $notifyIcon.Dispose()
        [System.Windows.Forms.Application]::Exit()
    }
})

# فاصل
$separator = New-Object System.Windows.Forms.ToolStripSeparator

# عنصر الخروج
$exitItem = New-Object System.Windows.Forms.ToolStripMenuItem
$exitItem.Text = "إغلاق أيقونة التحكم"
$exitItem.Add_Click({
    $notifyIcon.Visible = $false
    $notifyIcon.Dispose()
    [System.Windows.Forms.Application]::Exit()
})

# إضافة العناصر للقائمة
$contextMenu.Items.Add($openBrowserItem)
$contextMenu.Items.Add($separator)
$contextMenu.Items.Add($stopServerItem)
$contextMenu.Items.Add($exitItem)

# ربط القائمة بالأيقونة
$notifyIcon.ContextMenuStrip = $contextMenu

# عند النقر المزدوج، فتح المتصفح
$notifyIcon.Add_DoubleClick({
    Start-Process "http://localhost:8000"
})

# عرض إشعار البداية
$notifyIcon.BalloonTipIcon = [System.Windows.Forms.ToolTipIcon]::Info
$notifyIcon.BalloonTipTitle = "الوساطة العقارية"
$notifyIcon.BalloonTipText = "السيرفر يعمل على http://localhost:8000"
$notifyIcon.ShowBalloonTip(3000)

# تشغيل حلقة الرسائل
[System.Windows.Forms.Application]::Run()
