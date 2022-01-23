# semantic releaseの練習

```
メインブランチ main
開発の集約ブランチ develop
トピックブランチ xxx
```

![image](https://user-images.githubusercontent.com/7902223/150686220-e12e6b5c-53ad-4881-bb8b-5df8b5ad6746.png)

## workflow
1. mainブランチのpushをhookしてビルド
2. package.jsonのバージョン番号更新
3. mainにコミット
4. ビルド
5. GitHub Releaseの作成
