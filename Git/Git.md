## Git

ls  查看当前目录    clear  清空

git clone http:....  	需要克隆的链接

git branch -r 		查看远程的分支名

git checkout -b new		创建了一个名称为new的分支并切换到new分支上去

git checkout -b new master		从master分支分化一个新分支名为new，并切换到new分支上去

git checkout -b 分支名 origin/分支名       切换分支    -b是切换远程分支

git branch		查看分支

git branch -v   查看分支 

git branch -a		本地分支和远程分支

git merge		合并分支

git status 		查看当前项目中文件的状态。（或查看冲突情况）

git stash		  能够将所有未提交的修改（工作区和暂存区）保存至堆栈中，用于后续恢复当前工作目录。

git stash pop		从git栈中获取到最近一次stash进去的内容，恢复工作区的内容。获取之后，会删除栈中对应的stash。

git stash list		查看所有的stash

git add 			将文件纳入暂存区。命令可将该文件添加到暂存区

git add .            收集当前目录下的所有文件

git commit -m “如(首次提交)”

git pull			作用是从一个仓库或者本地的分支拉取并且整合代码。取回远程分支的更新，与本地的合并（如远程分支有新加的分支，通过此命令后本地才可以查看到）

git push		推送到远程服务器上对应的分支；如果当前分支只有一个远程分支，那么主机名都可以省略，如 git push

git push origin master	将本地D:\aqin_test1\目录下的内容同步到码云仓库，origin(远程主机名)

git fetch             将远程的某名的更新全部取回本地

git fetch origin    ???



git push origin feature-branch:feature-branch    //推送本地的feature-branch(冒号前面的)分支到远程origin的feature-branch(冒号后面的)分支(没有会自动创建)

git push origin dev.ZZC:dev.ZZC       将本地分支推送到远程分支   冒号两边>  本地分支名：远程分支名



git branch --set-upstream-to=origin/remote_branch your_branch   其中，origin/remote_branch是你本地分支对应的远程分支；your_branch是你当前的本地分支。 // 关联远程/同步分支

​     `git branch --set-upstream-to=origin/dev.ZZC`    



可以重新指定与远程同名的分支（推荐这种方式，执行之后以后就可以git push了）

 git push -u origin dev/ft/gdsexchange



切换分支

git branch -a  //查看远程分支

git checkout -b  ...  origin/...      点点点是要切换的目标分支

git checkout  ...



提交

git status		检查修改的代码

git stash		把修改的代码放到内存

git pull			拉代码，把远程仓库的代码拉取下来

git stash pop		把代码从内存拉取出来    先当与把我的分支远程的代码和现在修改的代码合并

git add .			加入要提交的代码

git commit -m '名'		提交备注

git push		提交代码





合并：先提交代码，提交完在git pull拉取；然后查看git branch -a；进行合并：git merge '合并的名' （如：git merge origin/dev）  在git pull

shift+：(冒号)+ q        》》在回车，退出



：wq!



// 切换到dev解决冲突在回来

git checkout dev

git merge dev.ZZC  //  合并我的到dev,为最新

git commit -am 'merge dev.ZZC'

git checkout dev.ZZC

git commit -m '解决冲突2'   // ？



git fetch    //  先用fetch命令更新remote索引 ;   远程有新分支时本地查不到用



操作失误 要  恢复git stash 

git stash pop 会删除上一步的git stash 暂存，

git stash  ; git stash pop 操作失误，没push又git stash导致修改的没了

第一，使用 git stash list 查看

第二，使用       `git stash apply stash@{c4ba289}`      { 这里放要恢复的id }   就可以了



git merge origin/zzc 这样合并后并退回 使用 git merge --abort 



```
git branch -vv
```

 查看关联的分支

修改后合并进远程某分支

​     `git push origin dev.zzc:dev`    



1. `git log` - 查看之前每次的commit记录列表
2. `git show` - 查看最近一次已commit的文件修改信息
3. `git show commit id`即可查看指定的文件修改详情











（一股脑）使用`merge`命令合并分支，解决完冲突，执行`git add .`和`git commit -m'fix conflict'`。这个时候会产生一个commit。

（交互式）使用`rebase`命令合并分支，解决完冲突，执行`git add .`和`git rebase --continue`，不会产生额外的commit。这样的好处是，‘干净’，分支上不会有无意义的解决分支的commit；坏处，如果合并的分支中存在多个`commit`，需要重复处理多次冲突。

`git pull`和`git pull --rebase`区别：`git pull`做了两个操作分别是‘获取’和合并。所以加了rebase就是以rebase的方式进行合并分支，默认为merge。
