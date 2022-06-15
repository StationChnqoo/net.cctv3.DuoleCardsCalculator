package net.cctv3.DuoleCalculator.newarchitecture.screens;

import android.graphics.Bitmap;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.ViewGroup;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import net.cctv3.DuoleCalculator.R;

public class MyWebViewScreen extends AppCompatActivity {
    private WebView webView = null;
    private WebSettings mWebSettings;
    private TextView beginLoading, endLoading, loading, mtitle;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.screen_web);
        webView = (WebView) findViewById(R.id.web_web);
        mWebSettings = webView.getSettings();
        webView.loadUrl(getIntent().getStringExtra("url"));
        mtitle = findViewById(R.id.web_title);

        // 设置不用系统浏览器打开,直接显示在当前 WebView
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }
        });

        // 设置 WebChromeClient 类
        webView.setWebChromeClient(new WebChromeClient() {
            // 获取网站标题
            @Override
            public void onReceivedTitle(WebView view, String title) {
                mtitle.setText(title);
            }

            // 获取加载进度
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
            }
        });

        // 设置 WebViewClient 类
        webView.setWebViewClient(new WebViewClient() {
            // 设置加载前的函数
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
            }

            // 设置结束加载函数
            @Override
            public void onPageFinished(WebView view, String url) {
            }
        });
    }

    // 点击返回上一页面而不是退出浏览器
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && webView.canGoBack()) {
            webView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    // 销毁 WebView
    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.loadDataWithBaseURL(null, "", "text/html", "utf-8", null);
            webView.clearHistory();
            ((ViewGroup) webView.getParent()).removeView(webView);
            webView.destroy();
            webView = null;
        }
        super.onDestroy();
    }
}