' ملف تشغيل سيرفر الوساطة العقارية
' يقوم بتشغيل السيرفر في الخلفية وفتح المتصفح

Option Explicit

Dim WshShell, fso, scriptPath, projectPath

Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' الحصول على مسار المشروع
scriptPath = fso.GetParentFolderName(WScript.ScriptFullName)
projectPath = scriptPath

' تغيير المجلد الحالي للمشروع
WshShell.CurrentDirectory = projectPath

' تشغيل السيرفر في الخلفية (بدون نافذة CMD)
WshShell.Run "cmd /c npm run dev", 0, False

' انتظار 3 ثواني حتى يبدأ السيرفر
WScript.Sleep 3000

' فتح المتصفح الافتراضي على عنوان السيرفر
WshShell.Run "http://localhost:8000", 1, False

' تشغيل أيقونة Tray للتحكم (اختياري)
' WshShell.Run "powershell -ExecutionPolicy Bypass -File """ & projectPath & "\tray-controller.ps1""", 0, False

' رسالة تأكيد
MsgBox "تم تشغيل سيرفر الوساطة العقارية بنجاح!" & vbCrLf & vbCrLf & _
       "العنوان: http://localhost:8000" & vbCrLf & vbCrLf & _
       "لإيقاف السيرفر، قم بتشغيل ملف stop-server.vbs", _
       vbInformation, "الوساطة العقارية"

Set WshShell = Nothing
Set fso = Nothing
