# 第一阶段：构建阶段
FROM node:20-alpine AS builder

# 安装pnpm
RUN npm install -g pnpm

# 设置工作目录
WORKDIR /app

# 复制包管理文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install 

# 复制源代码
COPY . .

# 构建项目
RUN pnpm build

# 第二阶段：生产阶段
FROM node:20-alpine

# 全局安装serve
RUN npm install -g serve

# 设置工作目录
WORKDIR /app

# 从构建阶段复制构建产物
COPY --from=builder /app/dist ./dist

# 暴露端口
EXPOSE 3000

# 启动serve
CMD ["serve", "-s", "dist", "-l", "3000"]