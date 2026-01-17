' ملف إيقاف سيرفر الوساطة العقارية
' يقوم بإنهاء جميع عمليات Node.js المتعلقة بالسيرفر

Option Explicit

Dim WshShell, result

Set WshShell = CreateObject("WScript.Shell")

' سؤال المستخدم قبل الإيقاف
result = MsgBox("هل تريد إيقاف سيرفر الوساطة العقارية؟", _
                vbQuestion + vbYesNo, "إيقاف السيرفر")

If result = vbYes Then
    ' إنهاء عمليات Node.js
    WshShell.Run "taskkill /F /IM node.exe", 0, True

    ' رسالة تأكيد
    MsgBox "تم إيقاف السيرفر بنجاح!", vbInformation, "الوساطة العقارية"
End If

Set WshShell = Nothing
