package net.cctv3.DuoleCalculator.newarchitecture.screens;

import android.app.ActivityOptions;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Typeface;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.os.Process;
import android.text.Html;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.method.LinkMovementMethod;
import android.text.style.ClickableSpan;
import android.text.style.URLSpan;
import android.view.View;
import android.widget.TextView;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import net.cctv3.DuoleCalculator.MainActivity;
import net.cctv3.DuoleCalculator.R;
import net.cctv3.DuoleCalculator.newarchitecture.cache.SharedPreferenceUtils;

public class WelcomeScreen extends AppCompatActivity {
    private AlertDialog welcomeDialog = null;
    private Bundle slideAnimation = null;
    private Bundle fadeAnimation = null;
    private SharedPreferenceUtils spu = null;

    /** 隐私政策对话框 */
    public static final String WELCOME_DIALOG_YES = "welcomeDialogYes";
    public static final String WELCOME_DIALOG_NO = "welcomeDialogNo";

    private Handler handler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            // WelcomeScreen.this.overridePendingTransition(0, 0);
            Intent it = new Intent(WelcomeScreen.this, MainActivity.class);
            //  禁止 ReactNative 页面回退到此页面
            it.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(it, fadeAnimation);
            finish();
        }
    };

    /**
     * 是否同意过隐私政策
     */
    private boolean isHaveAgreedWelcomeScreen() {
        String isAgreed = spu.get(SharedPreferenceUtils.IS_AGREED_WELCOME_SCREEN);
        return isAgreed.equals("1");
    }

    private void setLinkClickable(final SpannableStringBuilder clickableHtmlBuilder,
                                  final URLSpan urlSpan) {
        int start = clickableHtmlBuilder.getSpanStart(urlSpan);
        int end = clickableHtmlBuilder.getSpanEnd(urlSpan);
        int flags = clickableHtmlBuilder.getSpanFlags(urlSpan);
        ClickableSpan clickableSpan = new ClickableSpan() {
            public void onClick(View view) {
                // Do something with URL here.
                // System.out.println("Click HTML urlSpan: " + urlSpan.getURL());
                // Toast.makeText(HelloMISActivity.this, "Click HTML urlSpan: " + urlSpan.getURL(), Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(WelcomeScreen.this, MyWebViewScreen.class);
                intent.putExtra("url", urlSpan.getURL());
                startActivity(intent, slideAnimation);
            }
        };
        clickableHtmlBuilder.setSpan(clickableSpan, start, end, flags);
    }

    private CharSequence getClickableHtml(String html) {
        Spanned spannedHtml = Html.fromHtml(html);
        SpannableStringBuilder clickableHtmlBuilder = new SpannableStringBuilder(spannedHtml);
        URLSpan[] urls = clickableHtmlBuilder.getSpans(0, spannedHtml.length(), URLSpan.class);
        for (final URLSpan span : urls) {
            setLinkClickable(clickableHtmlBuilder, span);
        }
        return clickableHtmlBuilder;
    }

    @Override
    protected void onStart() {
        super.onStart();
        // 从右往左的动画
        slideAnimation = ActivityOptions.makeCustomAnimation(getApplicationContext(), R.anim.screen_slide_in, R.anim.screen_slide_out).toBundle();
        // 渐入渐出的动画
        fadeAnimation = ActivityOptions.makeCustomAnimation(getApplicationContext(), R.anim.screen_fade_in, R.anim.screen_fade_out).toBundle();
        if (isHaveAgreedWelcomeScreen()) {
            // 之前显示过启动页了，这个时候延时 1000ms，等页面完全呈现出来，然后跳转
            new Thread(new Runnable() {
                @Override
                public void run() {
                    try {
                        Thread.sleep(1000);
                        handler.sendMessage(new Message());
                    } catch (Exception e) {
                    }
                }
            }).start();
        } else {
            // 第一次授权的弹窗
            View welcomeView = View.inflate(this, R.layout.alert_welcome, null);
            TextView textTitle = welcomeView.findViewById(R.id.dialog_once_title);
            // 标题加粗
            textTitle.setTypeface(null, Typeface.BOLD);
            // 富文本
            TextView messageText = welcomeView.findViewById(R.id.dialog_once_message);
            messageText.setMovementMethod(LinkMovementMethod.getInstance());
            messageText.setText(
                    getClickableHtml("欢迎您使用采之汲。我们非常重视用户的隐私和个人信息保护。在您使用我们的服务时，我们将需要收集和使用您的个人信息。点击“同意”表示您同意和接受" +
                            "<a href=\"https://resource.caizhiji.com.cn/protocol/user-protocol.html\">《采之汲用户协议》</a>" +
                            "和" +
                            "<a href=\"https://resource.caizhiji.com.cn/protocol/privacy-protocol.html\">《采之汲隐私政策》</a>" +
                            "。" +
                            "我们提醒您审慎阅读其中涉及您的责任和权利的对应条款。")
            );
            AlertDialog.Builder alertBuilder = new AlertDialog.Builder(this)
                    .setPositiveButton("同意", new MyDialogClicker(WELCOME_DIALOG_YES))
                    .setNegativeButton("不同意", new MyDialogClicker(WELCOME_DIALOG_NO))
                    .setView(welcomeView)
                    .setCancelable(false);
            welcomeDialog = alertBuilder.create();
            welcomeDialog.show();
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.P)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        spu = new SharedPreferenceUtils(this);
        View view = View.inflate(this, R.layout.screen_welcome, null);
        setContentView(view);
    }

    class MyDialogClicker implements DialogInterface.OnClickListener {
        private String id;

        public MyDialogClicker(String id) {
            this.id = id;
        }

        @Override
        public void onClick(DialogInterface dialog, int which) {
            switch (this.id) {
                case WELCOME_DIALOG_YES:
                    spu.set(SharedPreferenceUtils.IS_AGREED_WELCOME_SCREEN, "1");
                    Intent it = new Intent();
                    it.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
                    it.setClass(WelcomeScreen.this, MainActivity.class);
                    startActivity(it, slideAnimation);
                    finish();
                    break;
                case WELCOME_DIALOG_NO:
                    Process.killProcess(Process.myPid());
                    break;
                default:
                    break;
            }
        }
    }
}
